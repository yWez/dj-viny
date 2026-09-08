const form = document.getElementById('bookingForm');
const eventSelect = document.getElementById('type');
const whatsappNumber = '5583998008841';

document.querySelectorAll('[data-event]').forEach((link) => {
  link.addEventListener('click', () => {
    const value = link.dataset.event;
    if (!value || !eventSelect) return;

    const exact = [...eventSelect.options].find((option) => option.value === value || option.text === value);
    if (exact) {
      eventSelect.value = exact.value || exact.text;
      return;
    }

    if (value === 'Casamento / 15 anos') {
      eventSelect.value = 'Casamento';
    }
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const text = [
    'Olá! Quero consultar a disponibilidade do Viny.',
    '',
    `Nome: ${data.get('name')}`,
    `Evento: ${data.get('type')}`,
    `Data: ${data.get('date') || 'A definir'}`,
    `Cidade: ${data.get('city')}`,
    data.get('message') ? `Detalhes: ${data.get('message')}` : ''
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
