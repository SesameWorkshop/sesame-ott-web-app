import React, { KeyboardEvent, memo } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { formatDurationTag } from '../../utils/formatting';

import styles from './Card.module.scss';

type CardProps = {
  onClick?: () => void;
  onHover?: () => void;
  title: string;
  duration: number;
  posterSource?: string;
  seriesId?: string;
  seasonNumber?: string;
  episodeNumber?: string;
  progress?: number;
  posterAspect?: '1:1' | '2:1' | '2:3' | '4:3' | '5:3' | '16:9' | '9:16';
  featured?: boolean;
  disabled?: boolean;
  loading?: boolean;
  isCurrent?: boolean;
  currentLabel?: string;
};

function Card({
  onClick,
  onHover,
  title,
  duration,
  posterSource,
  seriesId,
  seasonNumber,
  episodeNumber,
  progress,
  posterAspect = '16:9',
  featured = false,
  disabled = false,
  loading = false,
  isCurrent = false,
  currentLabel,
}: CardProps): JSX.Element {
  const { t } = useTranslation('common');
  const cardClassName = classNames(styles.card, {
    [styles.featured]: featured,
    [styles.disabled]: disabled,
  });
  const posterClassNames = classNames(styles.poster, styles[`aspect${posterAspect.replace(':', '')}`], {
    [styles.current]: isCurrent,
  });

  const renderTag = () => {
    if (loading || disabled || !title) return null;

    if (seriesId) {
      return <div className={styles.tag}>Series</div>;
    } else if (seasonNumber && episodeNumber) {
      return <div className={styles.tag}>S{seasonNumber}:E{episodeNumber}</div>
    } else if (duration) {
      return <div className={styles.tag}>{formatDurationTag(duration)}</div>;
    } else if (duration === 0) {
      return <div className={classNames(styles.tag, styles.live)}>{t('live')}</div>;
    }
  };

  return (
    <div
      className={cardClassName}
      onClick={onClick}
      onMouseEnter={onHover}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(event: KeyboardEvent) =>
        (event.key === 'Enter' || event.key === ' ') && !disabled && onClick && onClick()
      }
      role="button"
      aria-label={t('play_item', { title })}
    >
      <div className={posterClassNames} style={{ backgroundImage: posterSource ? `url(${posterSource})` : '' }}>
        {!loading && (
          <div className={styles.meta}>
            {featured && !disabled && (
              <div className={classNames(styles.title, { [styles.loading]: loading })}>{title}</div>
            )}
            {renderTag()}
          </div>
        )}
        {isCurrent && <div className={styles.currentLabel}>{currentLabel}</div>}
        {progress ? (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        ) : null}
      </div>
      {!featured && !disabled && (
        <div className={styles.titleContainer}>
          <div className={classNames(styles.title, { [styles.loading]: loading })}>{title}</div>
        </div>
      )}
    </div>
  );
}

export default memo(Card);
