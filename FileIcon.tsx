import React from 'react';
import { FileText, Image, Film, Music, Box, File } from 'lucide-react';

interface FileIconProps {
  mimeType: string;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ mimeType, className = "w-6 h-6" }) => {
  if (mimeType.startsWith('image/')) return <Image className={className} />;
  if (mimeType.startsWith('video/')) return <Film className={className} />;
  if (mimeType.startsWith('audio/')) return <Music className={className} />;
  if (mimeType.includes('pdf')) return <FileText className={className} />;
  if (mimeType.includes('word') || mimeType.includes('document')) return <FileText className={className} />;
  if (mimeType.includes('zip') || mimeType.includes('compressed')) return <Box className={className} />;
  
  return <File className={className} />;
};