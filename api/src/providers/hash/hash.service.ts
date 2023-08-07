import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hashText(text: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(text, salt);
  }

  async validHash(data: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(data, hashedText);
  }
}
