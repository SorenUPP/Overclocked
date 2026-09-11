'use client';

import styled from 'styled-components';
import { Container, Mono, SectionHeading } from '@/components/ui/primitives';

const Section = styled(Container)`
  padding-block: 48px 0;
`;

const Head = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 14px;
  margin-bottom: 18px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 6px;
`;

const TONE = {
  met: 'ok',
  applied: 'accent',
  conflict: 'warn',
  unmet: 'textFaint',
};

const STATUS_WORD = {
  met: 'Already covered',
  applied: 'Part swapped',
  conflict: 'Conflict',
  unmet: 'Not in this build',
};

const Row = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 14px;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-left: 2px solid ${({ theme, $s }) => theme.colors[TONE[$s]]};
  border-radius: ${({ theme }) => theme.radiusSmall};
`;

const Dot = styled.span`
  flex: none;
  width: 7px;
  height: 7px;
  margin-top: 5px;
  background: ${({ theme, $s }) => theme.colors[TONE[$s]]};
`;

const Label = styled.div`
  font-size: 13.5px;
  font-weight: 500;
`;

const Status = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const Detail = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 5px;
  line-height: 1.5;
`;

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
          {applied} swapped, {met} already covered
        </Mono>
      </Head>
      <List>
        {items.map((item) => (
          <Row key={item.id} $s={item.status}>
            <Dot $s={item.status} />
            <div>
              <Label>
                {item.label} <Status>— {STATUS_WORD[item.status]}</Status>
              </Label>
              <Detail>{item.detail}</Detail>
            </div>
          </Row>
        ))}
      </List>
    </Section>
  );
}
