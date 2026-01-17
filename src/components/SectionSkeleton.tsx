import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SectionSkeletonProps {
  type?: 'default' | 'contact' | 'cards';
}

const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ type = 'default' }) => {
  if (type === 'contact') {
    return (
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-72 mx-auto" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form skeleton */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-40" />
            </div>
            
            {/* Info skeleton */}
            <div className="space-y-6">
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-12 w-12 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-72 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-72 mx-auto" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default SectionSkeleton;
