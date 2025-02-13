import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post('register')
  async register(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.login(email, password);
  }

  @Get("role")
  async getUserRole(@Query("email") email: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.admin.listUsers(); // ✅ Fetch all users

    if (error || !data) throw new Error("Failed to fetch users");

    // ✅ Find the user with the matching email
    const user = data.users.find((user) => user.email === email);

    if (!user || !user.user_metadata?.role) {
      throw new Error("Role not found");
    }

    return { role: user.user_metadata.role };
  }
}