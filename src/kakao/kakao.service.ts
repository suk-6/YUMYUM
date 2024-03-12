import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoService {
    private static baseURL = 'https://api.kakaowork.com/v1';
    private headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.KAKAOBOT_API_KEY}`,
    };

    public getUsers() {
        return fetch(`${KakaoService.baseURL}/users.list`, {
            method: 'GET',
            headers: this.headers,
        }).then((res) => res.json());
    }
    public getConversation() {}
    public sendMessage(message: string) {}
}

!(async function () {
    const kakaoService = new KakaoService();
    console.log(await kakaoService.getUsers());
    console.log(process.env.KAKAOBOT_API_KEY);
})();
