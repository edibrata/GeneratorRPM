import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Loader2, Sparkles, Printer, FileText, FileDown, Copy } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    namaSekolah: '',
    namaGuru: '',
    nipGuru: '',
    namaKepsek: '',
    nipKepsek: '',
    jenjang: '',
    mataPelajaran: '',
    capaianPembelajaran: '',
    alokasiWaktu: '',
    kesiapanAwal: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      if (window.location.hostname.includes('github.io')) {
        throw new Error('Fitur ini membutuhkan server backend (Node.js) untuk memproses AI, yang tidak didukung oleh GitHub Pages (hanya untuk web statis). Silakan deploy aplikasi ini ke Render, Vercel, atau Cloud Run agar berfungsi penuh.');
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menghasilkan RPP');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportWord = () => {
    const html = document.querySelector('.prose')?.innerHTML;
    if (!html) return;
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>`;
    const footer = "</body></html>";
    const sourceHTML = header + html + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'Rencana_Pembelajaran_Mendalam.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const handleExportGoogleDocs = async () => {
    const html = document.querySelector('.prose')?.innerHTML;
    if (!html) return;
    try {
      const blob = new Blob([html], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob })];
      await navigator.clipboard.write(data);
      alert('Teks berhasil disalin! Silakan paste (Ctrl+V) di Google Docs yang baru akan terbuka.');
      window.open('https://docs.google.com/document/create', '_blank');
    } catch (err) {
      alert('Gagal menyalin ke clipboard. ' + err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden print:h-auto print:bg-white print:overflow-visible">
      {/* Header Section */}
      <header className="py-3 bg-blue-900 text-white flex items-center justify-between px-6 flex-shrink-0 print:hidden">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Generator Penyusunan Rencana Pembelajaran</h1>
            <p className="text-xs text-blue-200 mt-0.5">Berdasarkan Panduan Pembelajaran dan Asesmen serta Panduan-Panduan Mata Pelajaran BSKAP 2025</p>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end justify-center">
          <div className="bg-blue-800 border border-blue-700 px-3 py-1.5 rounded-full flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-widest text-blue-300 font-semibold">Dikembangkan oleh</span>
            <span className="text-xs font-bold text-white">Edi Brata</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row print:overflow-visible print:block">
        {/* Sidebar Input */}
        <aside className="w-full md:w-80 lg:w-96 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-5 flex flex-col space-y-4 flex-shrink-0 overflow-y-auto print:hidden">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 h-full">
            <div className="space-y-4 pb-4 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Identitas</h3>
              
              <div className="space-y-1">
                <label htmlFor="namaSekolah" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  id="namaSekolah"
                  name="namaSekolah"
                  placeholder="Contoh: SD Negeri 1"
                  value={formData.namaSekolah}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label htmlFor="namaGuru" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Nama Guru
                  </label>
                  <input
                    type="text"
                    id="namaGuru"
                    name="namaGuru"
                    value={formData.namaGuru}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="nipGuru" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    NIP Guru
                  </label>
                  <input
                    type="text"
                    id="nipGuru"
                    name="nipGuru"
                    value={formData.nipGuru}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label htmlFor="namaKepsek" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Nama Kepsek
                  </label>
                  <input
                    type="text"
                    id="namaKepsek"
                    name="namaKepsek"
                    value={formData.namaKepsek}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="nipKepsek" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    NIP Kepsek
                  </label>
                  <input
                    type="text"
                    id="nipKepsek"
                    name="nipKepsek"
                    value={formData.nipKepsek}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Parameter</h3>
              <div className="space-y-1">
              <label htmlFor="jenjang" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Jenjang / Fase
              </label>
              <select
                id="jenjang"
                name="jenjang"
                required
                value={formData.jenjang}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 bg-slate-50"
              >
                <option value="" disabled>Pilih Jenjang...</option>
                <option value="PAUD">PAUD</option>
                <option value="SD Fase A (Kelas 1-2)">SD Fase A (Kelas 1-2)</option>
                <option value="SD Fase B (Kelas 3-4)">SD Fase B (Kelas 3-4)</option>
                <option value="SD Fase C (Kelas 5-6)">SD Fase C (Kelas 5-6)</option>
                <option value="SMP Fase D (Kelas 7-9)">SMP Fase D (Kelas 7-9)</option>
                <option value="SMA/SMK Fase E (Kelas 10)">SMA/SMK Fase E (Kelas 10)</option>
                <option value="SMA/SMK Fase F (Kelas 11-12)">SMA/SMK Fase F (Kelas 11-12)</option>
                <option value="SLB / Pendidikan Khusus">SLB / Pendidikan Khusus</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="mataPelajaran" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Mata Pelajaran
              </label>
              <select
                id="mataPelajaran"
                name="mataPelajaran"
                required
                value={formData.mataPelajaran}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 bg-slate-50"
              >
                <option value="" disabled>Pilih mapel...</option>
                <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="Matematika">Matematika</option>
                <option value="Ilmu Pengetahuan Alam dan Sosial">Ilmu Pengetahuan Alam dan Sosial</option>
                <option value="Pendidikan Jasmani Olahraga dan Kesehatan">Pendidikan Jasmani Olahraga dan Kesehatan</option>
                <option value="Seni Musik">Seni Musik</option>
                <option value="Seni Rupa">Seni Rupa</option>
                <option value="Seni Teater">Seni Teater</option>
                <option value="Seni Tari">Seni Tari</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
                <option value="Koding dan Kecerdasan Artifisial">Koding dan Kecerdasan Artifisial</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="alokasiWaktu" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Alokasi Waktu
              </label>
              <input
                type="text"
                id="alokasiWaktu"
                name="alokasiWaktu"
                required
                placeholder="Contoh: 2 x 45 Menit"
                value={formData.alokasiWaktu}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="capaianPembelajaran" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Capaian Pembelajaran (CP)
              </label>
              <textarea
                id="capaianPembelajaran"
                name="capaianPembelajaran"
                required
                rows={4}
                placeholder="Tuliskan CP atau elemen yang ingin disasar..."
                value={formData.capaianPembelajaran}
                onChange={handleChange}
                className="w-full h-32 p-2 text-xs border border-slate-300 rounded bg-slate-50 leading-relaxed resize-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="space-y-1">
              <label htmlFor="kesiapanAwal" className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Kesiapan Awal <span className="font-normal normal-case">(Opsional)</span>
              </label>
              <textarea
                id="kesiapanAwal"
                name="kesiapanAwal"
                rows={3}
                placeholder="Contoh: Sebagian besar murid..."
                value={formData.kesiapanAwal}
                onChange={handleChange}
                className="w-full p-2 text-xs border border-slate-300 rounded bg-slate-50 leading-relaxed resize-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="pt-2 mt-auto">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold text-sm shadow-lg transition disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Hasilkan Modul Ajar'
                )}
              </button>
            </div>
            </div>
          </form>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto bg-slate-50 print:p-0 print:bg-white print:overflow-visible">
          <div className="h-full bg-white rounded-2xl shadow-md border border-slate-200 flex flex-col overflow-hidden print:shadow-none print:border-none print:rounded-none">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between print:hidden">
              <h2 className="text-sm font-bold text-blue-900">HASIL RENCANA PEMBELAJARAN</h2>
              {result && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    PDF
                  </button>
                  <button
                    onClick={handleExportGoogleDocs}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Google Docs
                  </button>
                  <button
                    onClick={handleExportWord}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Word (docx)
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto print:overflow-visible print:p-0">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-100 text-sm">
                  {error}
                </div>
              )}

              {!result && !error && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <Sparkles className="w-12 h-12 opacity-20" />
                  <p className="text-sm text-center max-w-sm">
                    Isi parameter di sebelah kiri dan klik "Hasilkan Modul Ajar" untuk merancang pembelajaran mendalam.
                  </p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center text-blue-900 space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin" />
                  <p className="text-sm font-bold animate-pulse">Merancang Pembelajaran Mendalam...</p>
                </div>
              )}

              {result && !loading && (
                <div className="prose prose-slate prose-sm max-w-none prose-headings:text-blue-900 prose-a:text-blue-600 print:text-black print:prose-headings:text-black">
                  <ReactMarkdown>{result.replace(/^---[\s\S]*?---\n/, '')}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer Info */}
      <footer className="h-8 bg-slate-200 border-t border-slate-300 flex items-center justify-between px-6 text-[10px] text-slate-500 flex-shrink-0 hidden sm:flex print:hidden">
        <div>Peringatan: Nilai Formatif dilarang digabungkan dengan Sumatif untuk Nilai Rapor.</div>
        <div className="font-medium">Sesuai Panduan Pembelajaran & Asesmen (PPA) Edisi 2025</div>
      </footer>
    </div>
  );
}
