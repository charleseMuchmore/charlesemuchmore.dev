import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const SESSION_KEY = 'site_session_active';

function getElementLabel(target) {
  if (!target) return 'unknown';

  const ariaLabel = target.getAttribute?.('aria-label');
  if (ariaLabel) return ariaLabel;

  const text = target.innerText?.trim();
  if (text) return text.slice(0, 120);

  const tagName = target.tagName?.toLowerCase();
  if (tagName) return tagName;

  return 'unknown';
}

function AnalyticsTracker() {
  const location = useLocation();
  const lastPathRef = useRef('');

  useEffect(() => {
    const pathname = location.pathname || '/';

    if (lastPathRef.current === pathname) {
      return;
    }

    lastPathRef.current = pathname;

    const isReturningSession = sessionStorage.getItem(SESSION_KEY);
    const isNewSession = !isReturningSession;

    if (isNewSession) {
      sessionStorage.setItem(SESSION_KEY, 'true');
    }

    fetch(`${API_BASE_URL}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'page_view',
        page_path: pathname,
        event_name: 'page_view',
        is_new_session: isNewSession,
        metadata: { source: 'spa' }
      })
    }).catch(() => undefined);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;
      const label = getElementLabel(target);
      const pathname = window.location.pathname || '/';
      const isReturningSession = sessionStorage.getItem(SESSION_KEY);
      const isNewSession = !isReturningSession;

      if (isNewSession) {
        sessionStorage.setItem(SESSION_KEY, 'true');
      }

      fetch(`${API_BASE_URL}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'click',
          page_path: pathname,
          event_name: 'click',
          element_text: label,
          is_new_session: isNewSession,
          metadata: { target: target.tagName?.toLowerCase() || 'unknown' }
        })
      }).catch(() => undefined);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

export default AnalyticsTracker;
