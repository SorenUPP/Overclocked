'use client';

import styled from 'styled-components';
import { Container, Mono, SectionHeading } from '@/components/ui/primitives';

const Section = styled(Container)`
  padding-block: 56px 0;
`;

const Head = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 14px;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 8px;
`;

const STYLES = {
  met: { border: 'rgba(74,222,128,.18)', bg: 'tintOk', icon: '✓', color: 'ok' },
  applied: {
    border: 'rgba(157,107,255,.35)',
    bg: 'tintAccent',
    icon: '⇄',
    color: 'accent',
  },
  conflict: {
    border: 'rgba(224,163,62,.24)',
    bg: 'tintWarn',
    icon: '!',
    color: 'warn',
  },
  unmet: {
    border: 'rgba(255,255,255,.09)',
    bg: 'surface',
    icon: '·',
    color: 'textFaint',
  },
};

const Row = styled.div`
  display: flex;
  gap: 13px;
  padding: 13px 14px;
  border: 1px solid ${({ $s }) => STYLES[$s].border};
  background: ${({ theme, $s }) => theme.colors[STYLES[$s].bg]};
`;

const Icon = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  line-height: 1.2;
  flex: none;
  color: ${({ theme, $s }) => theme.colors[STYLES[$s].color]};
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13.5px;
  font-weight: 500;
`;

const Detail = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 5px;
  line-height: 1.5;
  letter-spacing: 0.02em;
`;

const STATUS_WORD = {
  met: 'Already covered',
  applied: 'Part swapped',
  conflict: 'Conflict',
  unmet: 'Not in this build',
};

export default function PreferenceReport({ result }) {
  const items = result.preferences;
  if (!items || items.length === 0) return null;

  const applied = items.filter((i) => i.status === 'applied').length;
  const met = items.filter((i) => i.status === 'met').length;

  return (
    <Section as="section">
      <Head>
        <SectionHeading>Preferences</SectionHeading>
        <Mono>
          {applied} swapped · {met} already covered · {items.length} total
        </Mono>
      </Head>
      <Grid>
        {items.map((item) => (
          <Row key={item.id} $s={item.status}>
            <Icon $s={item.status}>{STYLES[item.status].icon}</Icon>
            <div>
              <Label>
                {item.label}
                {'  '}
                <Mono $size="9.5px">— {STATUS_WORD[item.status]}</Mono>
              </Label>
              <Detail>{item.detail}</Detail>
            </div>
          </Row>
        ))}
      </Grid>
    </Section>
  );
}
