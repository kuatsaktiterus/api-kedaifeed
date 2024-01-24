"use strict";
const Post = require('../../models/Feed/Post.model');
const controller = require('../controller');
const mediaService = require('../../services/media.service');

class PostController extends controller {
    async get(req, res) {
        const {created_at_after, page, per_page = 10} = req.body
        try {
            const post = await Post.find( { createdAt: { $gt:  created_at_after} } )
                            .skip(per_page * (page - 1))
                            .limit( per_page )
                            .sort( '-createdAt' )
                            .populate('user', '_id fullname kdcw_experiences in_tenure');
            res.status(200).json(super.response('success', 'success get posts data', post));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to get posts data error = ${error}`));
        }
    }

    async getById(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(super.response('success', 'success get posts data', post));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to get posts data error = ${error}`));
        }
    }

    async getByUser(req, res) {
        try {
            const post = await Post.find({user: req.params.id});
            res.status(200).json(super.response('success', 'success get posts data', post));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to get posts data error = ${error}`));
        }
    }

    async saveStatus(req, res) {
        try {
            const filename = mediaService.getFileName(req.files);
            const status = new Post({ 
                    user: req.params.id,
                    post_content: {
                        status: req.body.status,
                        media: filename
                    }
            });
            await status.save();
    
            res.status(201).json(super.response('success', 'success save status', status));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to save status data error = ${error}`));
        }
    }

    async updateStatus(req, res) {
        try {
            const {status, media, delete_media} = req.body;
            const query = {_id: req.params.id};
            const update = { 
                $set: {status: status}
            };
            const option = { new: true};

            const updatedUser = await User.findOneAndUpdate(query, update, option); 
            res.status(200).json(super.response('success', 'success update users profile data', updatedUser));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to update users data error = ${error}`));
        }
    }
}

module.exports = new PostController();