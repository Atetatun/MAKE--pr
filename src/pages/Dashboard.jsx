import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';

export function Dashboard() {
  const [cvs, setCVs] = useState([
    { id: 1, name: 'My CV', template: 'professional', lastEdited: '2 days ago' },
    { id: 2, name: 'Creative Portfolio', template: 'creative', lastEdited: '1 week ago' },
  ]);

  const handleNewCV = () => {
    window.location.href = '/templates';
  };

  const handleEdit = (id) => {
    window.location.href = `/builder?id=${id}`;
  };

  const handleDelete = (id) => {
    setCVs(cvs.filter(cv => cv.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-navy font-heading">My CVs</h1>
            <Button variant="primary" onClick={handleNewCV}>
              <Plus size={18} className="mr-2" /> New CV
            </Button>
          </div>

          {cvs.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-text-muted mb-6">No CVs yet. Let's create your first one!</p>
              <Button variant="primary" onClick={handleNewCV}>
                Get Started
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {cvs.map((cv) => (
                <Card key={cv.id}>
                  <h3 className="text-xl font-semibold text-navy mb-2 font-heading">{cv.name}</h3>
                  <p className="text-text-muted text-sm mb-4">
                    Template: <span className="capitalize font-semibold">{cv.template}</span>
                  </p>
                  <p className="text-text-muted text-sm mb-6">Last edited: {cv.lastEdited}</p>

                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => handleEdit(cv.id)}
                    >
                      <Edit size={16} className="mr-2" /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(cv.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
