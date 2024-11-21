import asyncHandler from 'express-async-handler';
import Document from '../models/documentModel.js';

// @desc    Get all documents
// @route   GET /api/documents
// @access  Private
const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ user: req.user.id });
  res.json(documents);
});

// @desc    Upload document
// @route   POST /api/documents
// @access  Private
const uploadDocument = asyncHandler(async (req, res) => {
  const { title, url, type } = req.body;

  const document = await Document.create({
    user: req.user.id,
    title,
    url,
    type
  });

  res.status(201).json(document);
});

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    res.status(404);
    throw new Error('Document not found');
  }

  if (document.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await document.deleteOne();
  res.json({ message: 'Document removed' });
});

// Single export statement
export { getDocuments, uploadDocument, deleteDocument }; 