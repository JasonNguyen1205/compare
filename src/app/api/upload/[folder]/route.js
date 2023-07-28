import { NextResponse } from 'next/server'
import { writeFile, mkdir, rmdir } from 'fs/promises'
import * as fsExtra from "fs-extra";

export async function POST(request, { params }) {

  const data = await request.formData()
  const file = data.get('file')

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  fsExtra.emptyDirSync(`./tmp/${params.folder}`);

  const path = `./tmp/${params.folder}/${file.name}`
  await writeFile(path, buffer)


  return NextResponse.json({ success: true })
}