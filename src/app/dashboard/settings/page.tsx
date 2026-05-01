export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <i className="pi pi-cog text-primary text-3xl" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Paramètres Système</h1>
      <p className="text-secondary max-w-md">L'accès aux configurations du modèle de langage et des paramètres d'interaction vocale est réservé aux administrateurs CGPR.</p>
    </div>
  );
}
