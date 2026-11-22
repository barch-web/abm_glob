'use client';

import React, { useState } from 'react';
import { Pencil, Plus, Trash2, Upload, X } from 'lucide-react';
import { useCMS } from '@/components/cms/CMSContext';
import type { GalleryItem } from '@/lib/cms-types';
import { SafeImage } from '@/components/ui/SafeImage';

export function GalleryManagerTab() {
  const {
    state,
    addGalleryCategory,
    deleteGalleryCategory,
    upsertGalleryItem,
    deleteGalleryItem,
  } = useCMS();

  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(state.galleryCategories[0] || '');
  const [location, setLocation] = useState('');
  const [completedDate, setCompletedDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [feedback, setFeedback] = useState('');

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory(state.galleryCategories[0] || '');
    setLocation('');
    setCompletedDate('');
    setDescription('');
    setImageUrl('');
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setLocation(item.location);
    setCompletedDate(item.completedDate);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setFeedback('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !imageUrl.trim()) {
      setFeedback('Please provide a project title, category, and image (upload or URL).');
      return;
    }

    const item: GalleryItem = {
      id: editingId || `gal-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      location: location.trim() || 'Accra, Ghana',
      completedDate: completedDate.trim() || 'November 2026',
      description: description.trim(),
      imageUrl: imageUrl.trim(),
    };

    await upsertGalleryItem(item);
    setFeedback(editingId ? 'Gallery project updated.' : 'New project added to gallery.');
    resetForm();
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    await addGalleryCategory(newCategory);
    setNewCategory('');
  };

  return (
    <div className="space-y-8">
      {/* Category Management */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-[#0A192F]">
          Gallery Service Categories
        </h2>
        <form onSubmit={handleAddCategory} className="flex flex-wrap gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name (e.g. Cloud & Backup Rollouts)"
            className="flex-1 min-w-[240px] px-3.5 py-2 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0A192F] hover:bg-[#112240] text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add Category</span>
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2">
          {state.galleryCategories.map((cat) => (
            <div
              key={cat}
              className="inline-flex items-center gap-2 bg-[#F4F6F9] border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-[#0A192F]"
            >
              <span>{cat}</span>
              <button
                type="button"
                onClick={() => deleteGalleryCategory(cat)}
                aria-label={`Remove category ${cat}`}
                className="text-slate-400 hover:text-red-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Project Form */}
      <form
        onSubmit={handleSaveItem}
        className="bg-white border border-slate-200 rounded-xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-[#0A192F]">
            {editingId ? 'Edit Gallery Project' : 'Add Photo / Project to Gallery'}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-semibold text-slate-600 hover:text-[#0A192F]"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 24-Port Office Cabling & Wi-Fi Mesh"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            >
              {state.galleryCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Osu, Accra"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Completed Date
            </label>
            <input
              type="text"
              value={completedDate}
              onChange={(e) => setCompletedDate(e.target.value)}
              placeholder="e.g. November 2026"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Image URL or File Upload (Stored Safely as Base64 in IndexedDB) *
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/images/service-networking.jpg or paste image URL"
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
              <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 hover:border-[#0A192F] bg-white text-xs font-semibold text-[#0A192F] cursor-pointer whitespace-nowrap">
                <Upload className="w-4 h-4" aria-hidden="true" />
                <span>Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {imageUrl && (
            <div className="md:col-span-2">
              <p className="text-xs font-medium text-slate-500 mb-1.5">Preview</p>
              <div className="w-48 aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                <SafeImage
                  src={imageUrl}
                  alt={title || 'Preview'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Project Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summarize equipment deployed, cabling standards, or training outcomes..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F6F9] border border-slate-300 text-sm text-[#0A192F] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>
        </div>

        {feedback && (
          <p className="text-xs font-semibold text-[#047857]">{feedback}</p>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A192F] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>{editingId ? 'Save Project Changes' : 'Publish to Gallery'}</span>
        </button>
      </form>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {state.gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[4/3] bg-slate-100">
                <SafeImage
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  fallbackTitle={item.title}
                />
              </div>
              <div className="p-4 space-y-1.5">
                <p className="text-xs font-semibold text-[#D97706] truncate">
                  {item.category}
                </p>
                <h3 className="text-sm font-bold text-[#0A192F] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 truncate">{item.location}</span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  aria-label={`Edit ${item.title}`}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0A192F]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteGalleryItem(item.id)}
                  aria-label={`Delete ${item.title}`}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
