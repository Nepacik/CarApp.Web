import {TokenDto} from "../../dtos/token-dto";
import {Injectable} from "@angular/core";
import {UserInfo} from "../../models/user-info";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
  })
export class TokenStorage {
  readonly accessToken: string = "ACCESS_TOKEN";
  readonly refreshToken: string = "REFRESH_TOKEN";

  saveTokens(tokenDto: TokenDto) {
    window.localStorage.removeItem(this.accessToken);
    window.localStorage.removeItem(this.refreshToken);
    window.localStorage.setItem(this.accessToken, tokenDto.accessToken);
    window.localStorage.setItem(this.refreshToken, tokenDto.refreshToken);
  }

  getAccessToken(): string|null {
    return window.localStorage.getItem(this.accessToken);
  }

  getRefreshToken(): string|null {
    return window.localStorage.getItem(this.refreshToken);
  }

  getUserInfo(): UserInfo {
    let at = window.localStorage.getItem(this.accessToken);
    if(at == null) {
      return new UserInfo('', false)
    } else {
      let decodedToken: any = jwtDecode(at);
      let role: string = decodedToken.role
      console.log(decodedToken.role)
      return new UserInfo(role, true);
    }
  }

  clearTokens() {
    window.localStorage.removeItem(this.accessToken);
    window.localStorage.removeItem(this.refreshToken);
  }
}
