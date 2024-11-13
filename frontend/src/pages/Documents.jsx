import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Download,
  Upload,
  Eye,
  X,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

const DocumentViewer = ({ document, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {document.title}
                  </h3>
                  <button
                    onClick={onClose}
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mt-4">
                  <iframe
                    src={document.url}
                    className="w-full h-[600px] border-2 border-gray-200 rounded-lg"
                    title={document.title}
                  />
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => window.open(document.url, '_blank')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = document.url;
                      link.download = document.title;
                      link.click();
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DocumentTrends = ({ trends, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Document Trends
              </h3>
              <button
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {trends.map((trend, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        trend.change > 0 ? 'bg-green-100 text-green-600' :
                        trend.change < 0 ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {trend.change > 0 ? <TrendingUp className="h-4 w-4" /> :
                         trend.change < 0 ? <TrendingDown className="h-4 w-4" /> :
                         <Minus className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{trend.title}</p>
                        <p className="text-xs text-gray-500">{trend.period}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${
                      trend.change > 0 ? 'text-green-600' :
                      trend.change < 0 ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {trend.change > 0 ? '+' : ''}{trend.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showTrends, setShowTrends] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [documentTrends, setDocumentTrends] = useState([
    { title: 'Document Views', period: 'Last 7 days', change: 12 },
    { title: 'Downloads', period: 'Last 7 days', change: -5 },
    { title: 'Upload Frequency', period: 'Last 30 days', change: 8 },
    { title: 'Storage Usage', period: 'This month', change: 15 }
  ]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/documents', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowTrends(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              View Trends
            </button>
            <button
              onClick={() => {/* Implement upload functionality */}}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by uploading a document.</p>
            <div className="mt-6">
              <button
                onClick={() => {/* Implement upload functionality */}}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((document) => (
              <motion.div
                key={document._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="p-6 cursor-pointer" onClick={() => setSelectedDocument(document)}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">{document.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedDocument && (
          <DocumentViewer
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        )}

        {showTrends && (
          <DocumentTrends
            trends={documentTrends}
            onClose={() => setShowTrends(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Documents; 