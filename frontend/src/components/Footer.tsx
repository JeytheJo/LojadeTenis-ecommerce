export default function Footer() {
  return (
    <footer className="bg-offwhite flex flex-col gap-[48px] pb-[32px] pt-[56px] px-[64px] w-full">
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-[14px]">
          <p className="font-display text-ink text-[32px]">Kicks&amp;Co.</p>
          <div className="font-sans text-steel text-[13px]">
            <p>Objetos com propósito.</p>
            <p>Uma casa com a sua essência.</p>
          </div>
        </div>
        <div className="flex gap-[80px] font-sans text-[12px] text-steel">
          <div className="flex flex-col gap-[12px]">
            <p className="font-semibold text-ink text-[13px]">Explore</p>
            <p>Todos os produtos</p>
            <p>Novidades</p>
            <p>Mais vendidos</p>
          </div>
          <div className="flex flex-col gap-[12px]">
            <p className="font-semibold text-ink text-[13px]">Precisa de ajuda?</p>
            <p>Entregas e fretes</p>
            <p>Trocas e devoluções</p>
            <p>Fale com a gente</p>
          </div>
        </div>
      </div>
      <div className="border-t border-sand pt-[24px] flex justify-between w-full font-sans text-[11px] text-steel">
        <p>© {new Date().getFullYear()} Kicks&amp;Co. Todos os direitos reservados.</p>
        <p>Trabalho de Banco de Dados · Privacidade · Termos de uso</p>
      </div>
    </footer>
  )
}