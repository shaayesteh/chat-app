import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface Chat {
  id: string;
  title: string;
  category: string;
  description: string;
}

const filePath = path.resolve(process.cwd(), 'data', 'chats.json');

export async function POST(req: NextRequest) {
  const newChat: Omit<Chat, 'id'> = await req.json();
  const chatWithId: Chat = { ...newChat, id: uuidv4() };

  const fileData = fs.readFileSync(filePath, 'utf8');
  const chats: Chat[] = JSON.parse(fileData);

  chats.push(chatWithId);

  fs.writeFileSync(filePath, JSON.stringify(chats, null, 2));

  return NextResponse.json(chatWithId, { status: 201 });
}

export async function GET() {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const chats: Chat[] = JSON.parse(fileData);
  return NextResponse.json(chats, { status: 200 });
}
