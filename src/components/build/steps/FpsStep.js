'use client';

import styled from 'styled-components';
import { fpsTargets } from '@/lib/data';
import { SelectCard } from '@/components/build/SelectCard';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Card = styled(SelectCard)`
  flex: 1;
  min-width: 118px;
  padding: 22px 18px;
`;

const Big = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
`;

const Tag = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textFaint};
  letter-spacing: 0.1em;
  margin-top: 8px;
  text-transform: uppercase;
`;

const Note = styled.div`
  margin-top: 22px;
  padding: 15px 18px;
  border-left: 2px solid ${({ theme }) => theme.colors.warn};
  background: ${({ theme }) => theme.colors.tintWarn};

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.58;
    color: ${({ theme }) => theme.colors.warnText};
  }

  strong {
    color: #e9be71;
    font-weight: 600;
  }
`;

export default function FpsStep({ value, set }) {
  return (
    <div>
      <Row>
        {fpsTargets.map((f) => (
          <Card
            key={f.value}
            $selected={value.fps === f.value}
            $strong
            role="radio"
            aria-checked={value.fps === f.value}
            tabIndex={0}
            onClick={() => set('fps', f.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                set('fps', f.value);
              }
            }}
          >
            <Big>{f.label}</Big>
            <Tag>{f.tag}</Tag>
          </Card>
        ))}
      </Row>
      <Note>
        <p>
          FPS is a <strong>target</strong>, not a guarantee. We pick hardware that
          has held this range in curated benchmark records at your resolution.
          Real results move with settings, drivers and game version.
        </p>
      </Note>
    </div>
  );
}
