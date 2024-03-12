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
        if (!res.ok) throw new Error('Failed to fetch user list');

        const data = await res.json();
        if (!data.success) throw new Error('Failed to fetch user list');

        return data.users
            .map((user: any) => {
                if (user.department !== 'Teacher') return parseInt(user.id);
            })
            .filter((id: number) => id);
    }

    public async getConversation(userIDs: number[]) {
        let conversationIDs: string[] = [];

        for (const userID of userIDs) {
            const conversationID = await fetch(
                `${KakaoService.baseURL}/conversations.open`,
                {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify({
                        user_id: userID,
                    }),
                },
            )
                .then((res) => res.json())
                .then((data) => data.conversation.id);

            conversationIDs.push(conversationID);
        }

        return conversationIDs;
    }
    public async sendMessage(message: string) {
        for (const conversationID of await this.getConversation(
            await this.getUserIDs(),
        )) {
            fetch(`${KakaoService.baseURL}/messages.send`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    conversation_id: conversationID,
                    text: message,
                }),
            });
        }
    }
}
