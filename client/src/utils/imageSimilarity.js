import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model = null;

// Load the MobileNet model
export const loadModel = async () => {
    if (!model) {
        model = await mobilenet.load();
    }
    return model;
};

// Extract features from an image
export const extractFeatures = async (imageElement) => {
    const model = await loadModel();
    const features = await model.infer(imageElement, true);
    return features;
};

// Calculate cosine similarity between two feature vectors
export const cosineSimilarity = (vec1, vec2) => {
    const dotProduct = tf.sum(tf.mul(vec1, vec2));
    const norm1 = tf.norm(vec1);
    const norm2 = tf.norm(vec2);
    return dotProduct.div(norm1.mul(norm2));
};

// Find similar images
export const findSimilarImages = async (queryImage, candidateImages, threshold = 0.5) => {
    const queryFeatures = await extractFeatures(queryImage);
    const similarities = [];

    for (const candidate of candidateImages) {
        const candidateFeatures = await extractFeatures(candidate);
        const similarity = await cosineSimilarity(queryFeatures, candidateFeatures);
        similarities.push({
            image: candidate,
            similarity: similarity.dataSync()[0]
        });
    }

    // Sort by similarity and filter by threshold
    return similarities
        .filter(item => item.similarity >= threshold)
        .sort((a, b) => b.similarity - a.similarity);
}; 