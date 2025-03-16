import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'data', 'chats.json');

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();

  const fileData = fs.readFileSync(filePath, 'utf8');
  const chats = JSON.parse(fileData);

  const chat = chats.find((chat: { id: string }) => chat.id === id);

  if (chat) {
    return NextResponse.json(chat, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
  }
}
