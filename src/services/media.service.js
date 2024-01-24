"use strict";
const Post = require('../models/Feed/Post.model');

class mediaService {
    getFileName(files) {
        return files.map(file => file.filename);
    }

    deleteMedia(medias, userId) {
        medias = Array.from(medias);
        
        medias.map(async media => {
            await Post.findByIdAndUpdate(userId, 
                {
                    $pull: {media: media}
                }
            );
        });
    }
}

module.exports = new mediaService();