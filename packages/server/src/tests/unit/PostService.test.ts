import { beforeAll, describe, it, expect } from '@jest/globals';

import { PostService } from '../../domain/services/PostService';
import { NewPost } from '../../domain/entities/Post';

import { createdUser } from '../jest.setup';
import { PgUUID } from 'drizzle-orm/pg-core';

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
    })

    it('should add a new post', async () => {
        try {
            createdPostID = await postService.addPost(newPost);
            expect(createdPostID).toBeTruthy();
        } catch (error) {
            console.error('Error during adding a new post:');
            console.error(error);
        }
    })

    it('should get a post by its id', async () => {
        try {
            const post = await postService.getPostById(createdPostID || '');
            if (!post) {
                throw new Error('Post not found');
            }
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
        } catch (error) {
            console.error('Error during getting a post by its id:');
            console.error(error);
        }
    });

    it('should get all posts', async () => {
        const posts = await postService.getAllPosts();
        expect(posts).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(PgUUID),
                    title: expect.any(String),
                    content: expect.any(String),
                    author: expect.objectContaining({
                        id: expect.any(PgUUID),
                        username: expect.any(String)
                    }),
                    date: expect.any(Date),
                    comments: expect.anything()
                })
            ])
        )
    })
})