import { Injectable } from '@nestjs/common';
import { dietResult } from 'src/neis/neis.model';

@Injectable()
export class KakaoService {
    private static baseURL = 'https://api.kakaowork.com/v1';
    private headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.KAKAOBOT_API_KEY}`,
    };
    public userIDs = [];
    public conversationIDs = [];

    public async getUserIDs() {
        const res = await fetch(
            `${KakaoService.baseURL}/users.list?limit=100`,
            {
                method: 'GET',
                headers: this.headers,
            },
        );
        if (!res.ok) throw new Error('Failed to fetch user list');

        const data = await res.json();
        if (!data.success) throw new Error('Failed to fetch user list');

        return data.users
            .map((user: any) => {
                if (user.department !== 'Teacher') return parseInt(user.id);
            })
            .filter((id: number) => id)
            .filter((id: number) => id === 10203314);
    }

    public async getConversation() {
        if (this.userIDs.length === 0) this.userIDs = await this.getUserIDs();
        let conversationIDs: string[] = [];

        for (const userID of this.userIDs) {
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
        if (this.conversationIDs.length === 0)
            this.conversationIDs = await this.getConversation();

        for (const conversationID of this.conversationIDs) {
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

    public async sendBlockMessage(message: dietResult) {
        if (this.conversationIDs.length === 0)
            this.conversationIDs = await this.getConversation();

        const blockMessage = {
            text: `${message.title}\n\n${message.diet.join('\n')}\n\n${message.kcal}`,
            blocks: [
                {
                    type: 'header',
                    text: message.title,
                    style: 'blue',
                },
                {
                    type: 'text',
                    text: `${message.diet.join('\n')}\n\n${message.kcal}`,
                },
            ],
        };

        for (const conversationID of this.conversationIDs) {
            fetch(`${KakaoService.baseURL}/messages.send`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    conversation_id: conversationID,
                    text: blockMessage.text,
                    blocks: blockMessage.blocks,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.success) console.error(data);
                });
        }
    }
}
