import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Extract user from JWT

    console.log("🔍 Checking Admin Role from Metadata:", user.role);

    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException('Access denied. Admins only.');
    }

    return true;
  }
}
