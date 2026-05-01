export default function CalendarPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <i className="pi pi-calendar text-primary text-3xl" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Calendrier des Séances</h1>
      <p className="text-secondary max-w-md">Le module de planification des séances sera bientôt disponible pour gérer les rendez-vous d'évaluation.</p>
    </div>
  );
}
