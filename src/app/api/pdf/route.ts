import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import * as pdfjs from 'pdfjs-dist/build/pdf.mjs';
import { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';

export async function POST(req: NextRequest, res: NextResponse) {
  // @ts-ignore
  await import('pdfjs-dist/build/pdf.worker.min.mjs');

  const filePath = './documents/PlantBasedDiet2019.pdf';

  const doc = await pdfjs.getDocument(filePath).promise;
  const numPages = doc.numPages;
  const fileContent: string[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const textContent = await page.getTextContent();

    textContent.items.forEach((item: TextItem) => {
        fileContent.push(`${item.str}${item.hasEOL ? '\n' : ''}`);
    });
  }

  return NextResponse.json({ content: fileContent.join(' ') }, { status: 200 });
}
