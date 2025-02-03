import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
      this.supabase = createClient(
        process.env.SUPABASE_URL || '',
        process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      );
  
      if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
        throw new Error("Missing Supabase environment variables!");
      }
    }
  
    getClient(): SupabaseClient {
      return this.supabase;
    }
  
}