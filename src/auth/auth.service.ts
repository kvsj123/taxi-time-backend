import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    if (error || !data.user) {
      throw new UnauthorizedException(error?.message || "Invalid credentials");
    }

    console.log("🔍 Supabase User Data:", data.user);

    // ✅ Get user role from Supabase metadata
    const role = data.user.user_metadata?.role; 

    if (!role) {
      throw new UnauthorizedException("Role not assigned in metadata");
    }

    // ✅ Generate JWT token including role
    const payload = { sub: data.user.id, email: data.user.email, role };
    const accessToken = this.jwtService.sign(payload);

    console.log("✅ Generated JWT:", { token: accessToken, role });

    return { accessToken };
  }
  
}