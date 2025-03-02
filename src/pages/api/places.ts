import { NextApiRequest, NextApiResponse } from 'next'
import serviceAccount from 'service-account.json'

import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { JWT, GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';


interface dataRawType  {
  id: string,
  no: string,
  nama: string,
  kampong: string,
  kecamatan: string,
  opd: string,
  opdPelaksana: string,
  tipe: string,
  koordinate: string,
  keterangan: string | null,
  gambar: string | null,
}


const auth = new JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
    ],
})

const driveService = google.drive({version: 'v3', auth});

const DRIVE_ID = "1r9O1AC3kg72pupJCKlgdc4TNI97DVeW9"

const getDriveImageURL = async (filename: string): Promise<string | null> => {
  try{
    const res = await driveService.files.list({
      q: `name contains '${filename}' and trashed = false and '${DRIVE_ID}' in parents`,
      fields: 'files(id, name)',
      // driveId: DRIVE_ID,
      // corpora: 'drive',
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
    })

    // console.log('namafile : ', filename, ' hasil: ', res.data.files?.[0]);

    const file = res.data.files?.[0];
    if(!file) return null;

    return `https://drive.google.com/thumbnail?id=${file.id}`;
  }catch(err){
    console.log('error : ', err)
    return null;
  }
}

const doc = new GoogleSpreadsheet(`${process.env.SHEET_ID}`, auth)
const accessSheet = async (): Promise<GoogleSpreadsheetWorksheet> => {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  return sheet;
}

const getRows = async () => {
  const sheet = await accessSheet();
  const rows = await sheet.getRows();

  const data: dataRawType[] = await Promise.all(rows.map(async (row) => {

    const filename = row.get('gambar');
    const imageUrl = await getDriveImageURL(filename)

      return {
        id: row.get('id'),
        no: row.get('no'),
        nama: row.get('nama'),
        kampong: row.get('kampong'),
        kecamatan: row.get('kecamatan'),
        opd: row.get('opd'),
        opdPelaksana: row.get('opd pelaksana'),
        tipe: row.get('tipe'),
        koordinate: row.get('koordinate'),
        keterangan: row.get('keterangan'),
        gambar: imageUrl
      }
  }));
  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }


  const data = await getRows();

  const pointData : {}[] = [];
  const lineData : {}[] = [];

  data.forEach((item) => {
    if (!item.id) return;
    let koor;
    try {
      koor = JSON.parse(item.koordinate);
    } catch (error) {
      console.error("Error parsing koordinate:", error);
      return;
    }

     if (item.tipe.includes("banyak titik")) {
      koor.forEach((coordinate: any) => {
        pointData.push({
          id: parseInt(item.id, 10),
          no: item.no,
          nama: item.nama,
          kampong: item.kampong,
          kecamatan: item.kecamatan,
          opd: item.opd,
          opdPelaksana: item.opdPelaksana,
          tipe: item.tipe,
          koordinate: [coordinate[0], coordinate[1]],
          keterangan: item.keterangan || null,
          gambar: item.gambar,
        });
      });
    } else if (item.tipe.includes("titik")) {
      pointData.push({
        id: parseInt(item.id, 10),
        no: item.no,
        nama: item.nama,
        kampong: item.kampong,
        kecamatan: item.kecamatan,
        opd: item.opd,
        opdPelaksana: item.opdPelaksana,
        tipe: item.tipe,
        koordinate: [koor[0][0], koor[0][1]],
        keterangan: item.keterangan || null,
        gambar: item.gambar,
      });
    } else {
      lineData.push({
        id: parseInt(item.id, 10),
        no: item.no,
        nama: item.nama,
        kampong: item.kampong,
        kecamatan: item.kecamatan,
        opd: item.opd,
        opdPelaksana: item.opdPelaksana,
        tipe: item.tipe,
        koordinate: [koor[0][0], koor[0][1]],
        keterangan: item.keterangan || null,
        gambar: item.gambar,
      });
    }
  });

  const meta = {
    jumlahTitik: pointData.length ,
    jumlahGaris: lineData.length ,
    jumlahData: data.length,
  }

  res.status(200).json({titik: pointData, garis: lineData, metadata: meta });
}
