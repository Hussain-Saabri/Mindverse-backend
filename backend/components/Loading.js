import { ColorRing } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
       
      }}
    >
      <ColorRing
        visible={true}
        height={250}
        width={250}
        colors={
["#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87"]










} // green gradients
        ariaLabel="color-ring-loading"
      />
      <h1
        style={{
          marginTop: '10px',
          fontSize: '1.5rem',
          fontWeight: '600',
          background: 'linear-gradient(to right, #2563eb, #0ea5e9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
       
      </h1>
    </div>
  );
}
