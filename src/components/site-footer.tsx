import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="flex items-end justify-center py-0 md:px-8 md:py-0 h-12">
      <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        Built by{' '}
        <a
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          altuntaş
        </a>
      </p>
    </footer>
  );
}
