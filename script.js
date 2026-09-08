const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const topbar = document.getElementById('topbar');
const form = document.getElementById('bookingForm');
const whatsappNumber = '5583998008841';
const setMenu = (open) => {
mobileMenu.classList.toggle('open', open);
menuBtn.classList.toggle('active', open);
menuBtn.setAttribute('aria-expanded', String(open));
mobileMenu.setAttribute('aria-hidden', String(!open));
document.body.classList.toggle('menu-open', open);
};
menuBtn.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
const syncTopbar = () => topbar.classList.toggle('scrolled', window.scrollY > 18);
syncTopbar();
window.addEventListener('scroll', syncTopbar, { passive: true });
form.addEventListener('submit', (event) => {
event.preventDefault();
const data = new FormData(form);
const text = [
'Olá! Quero consultar a disponibilidade do Viny.',
'',
`Nome: ${data.get('name')}`,
`WhatsApp: ${data.get('phone')}`,
`Data: ${data.get('date') || 'A definir'}`,
`Cidade: ${data.get('city')}`,
`Formato do evento: ${data.get('type')}`,
data.get('message') ? `Detalhes: ${data.get('message')}` : ''
].filter(Boolean).join('\n');
window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced && 'IntersectionObserver' in window) {
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('in');
observer.unobserve(entry.target);
}
});
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}