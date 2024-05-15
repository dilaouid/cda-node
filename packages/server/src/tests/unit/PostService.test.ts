import { beforeAll, describe, it, expect } from '@jest/globals';
import { sql } from 'drizzle-orm';

import { PostService } from '../../domain/services/PostService';
import { NewPost } from '../../domain/entities/Post';

import { createdUser } from '../jest.setup';
import { db } from '../../infrastructure/data';

function expectNullableAny(value: any) {
    if (value !== null) {
      expect(value).toEqual(expect.anything());
    } else {
      expect(value).toBeNull();
    }
}

describe('PostService', () => {
    let postService: PostService;
    let now = new Date();
    let createdPostID: string | undefined;
    let newPost: NewPost = { 
        title: 'Nouveau post stylé',
        content: "Ceci est le contenu d'un post vraiment sympa",
        author: createdUser.id,
        date: now
    }

    beforeAll(async () => {
        postService = new PostService();
        newPost.author = createdUser.id;
        await db.execute(sql`SET search_path TO test`);
    })

    it('should add a new post', async () => {
        createdPostID = await postService.addPost(newPost);
        expect(createdPostID).toBeTruthy();
    })

    it('should get a post by its id', async () => {
        const post = await postService.getPostById(createdPostID || '');
        expect(post[0]).toEqual(
            expect.objectContaining({
                id: createdPostID,
                title: newPost.title,
                content: newPost.content,
                author: expect.objectContaining({
                    id: createdUser.id,
                    username: createdUser.username
                }),
                comments: null,
                date: now
            })
        )
    });

    it('should get all posts', async () => {
        const posts = await postService.getAllPosts();
        posts.forEach((post: any) => {
            expect(post).toMatchObject({
              id: expect.any(String),
              title: expect.any(String),
              content: expect.any(String),
              author: expect.objectContaining({
                id: expect.any(String),
                username: expect.any(String)
              }),
              date: expect.any(Date)
            });
            expectNullableAny(post.comments); // Check comments separately
          });
    })
})