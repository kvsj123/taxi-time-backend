import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signUp({ email, password });

    if (error) throw new Error(error.message);
    return data;
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithPassword({ email, password });

    if (error) throw new Error(error.message);

    // Generate JWT token
    const payload = { sub: data.user.id, email: data.user.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}