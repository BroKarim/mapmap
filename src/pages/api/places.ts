import { NextApiRequest, NextApiResponse } from 'next'
import serviceAccount from 'service-account.json'

import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';


interface dataRawType  {
  id: string,
  no: string,
  nama: string,
  kampong: string,
  kecamatan: string,
  opd: string,
  tipe: string,
  koordinate: string,
  keterangan: string | null,
}


const serviceAccountAuth = new JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const doc = new GoogleSpreadsheet(`${process.env.SHEET_ID}`, serviceAccountAuth)


const accessSheet = async (): Promise<GoogleSpreadsheetWorksheet> => {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  return sheet;
}

const getRows = async () => {
  const sheet = await accessSheet();
  const rows = await sheet.getRows();

  const data: dataRawType[] = rows.map((row) => {
      return {
        id: row.get('id'),
        no: row.get('no'),
        nama: row.get('nama'),
        kampong: row.get('kampong'),
        kecamatan: row.get('kecamatan'),
        opd: row.get('opd'),
        tipe: row.get('tipe'),
        koordinate: row.get('koordinate'),
        keterangan: row.get('keterangan'),
      }
  });
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

  data.map((item :any) => {
    if(item.id === undefined) return
    if(item.tipe.includes("titik")){
      pointData.push( {
        id: parseInt(item.id, 10),
        no: item.no,
        nama: item.nama,
        kampong: item.kampong,
        kecamatan: item.kecamatan,
        opd: item.opd,
        tipe: item.tipe,
        koordinate: JSON.parse(item.koordinate.replace(/'/g, '"'))[0],
        keterangan: item.keterangan || null,
      })
    }else if(item.id){
      lineData.push({
        id: parseInt(item.id, 10),
        no: item.no,
        nama: item.nama,
        kampong: item.kampong,
        kecamatan: item.kecamatan,
        opd: item.opd,
        tipe: item.tipe,
        koordinate: JSON.parse(item.koordinate.replace(/'/g, '"'))[0],
        keterangan: item.keterangan || null,
      })
    }

  })
  const meta = {
    jumlahTitik: pointData.length ,
    jumlahGaris: lineData.length ,
    jumlahData: data.length,
  }

  res.status(200).json({titik: pointData, garis: lineData, metadata: meta });
}
