import HomeCards from '@/components/HomeCards';

export default function Home() {
  return (
    <main style={{ fontFamily: 'Fredoka One, Arial Black, Segoe UI, Tahoma, Geneva, Verdana, sans-serif', padding: '2rem 0', background: '#fff' }}>
      <h1 style={{ textAlign: 'center', fontSize: '4rem', fontWeight: 900, marginBottom: '2.5rem', letterSpacing: '2px', fontFamily: 'Fredoka One, Arial Black, sans-serif' }}>Useful tools</h1>
      <HomeCards />
      <div style={{ width: '80%', margin: '2.5rem auto 0 auto', background: '#c82333', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '1.5rem', textAlign: 'center', fontSize: '2rem', fontWeight: 700, color: '#fff', fontFamily: 'Fredoka One, Arial Black, sans-serif' }}>
        About the creator
      </div>
    </main>
  );
}
