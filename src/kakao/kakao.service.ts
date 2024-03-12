import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoService {
    private static baseURL = 'https://api.kakaowork.com/v1';
    private headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.KAKAOBOT_API_KEY}`,
    };

    public async getUserIDs() {
        const res = await fetch(`${KakaoService.baseURL}/users.list`, {
            method: 'GET',
            headers: this.headers,
        });
        const data = await res.json();
        const users = data.users;
        const userIDs = users.map((user: any) => parseInt(user.id));

        return userIDs;
    }

    public getConversation(userIDs: number[]) {
        let conversationIDs: number[] = [];
        for (const userID of userIDs) {
            conversationIDs.push(userID);
        }
    }
    public sendMessage(message: string) {}
}

!(async function () {
    const kakaoService = new KakaoService();
    console.log(await kakaoService.getUserIDs());
})();
