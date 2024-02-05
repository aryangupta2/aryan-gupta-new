import * as React from 'react'

import * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import { Breadcrumbs, Header, useNotionContext } from 'react-notion-x'

import { navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoSunnyOutline /> : <IoMoonSharp />}
    </div>
  )
}

const ResumeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  // URL to resume in local Notion file storage
  const resumeViewUrl = 'https://file.notion.so/f/f/41ad14f8-d2a5-4b1a-b182-c66a02e1ef17/8aebdf95-67cb-4169-998b-659ba393cfa9/Aryan_Gupta_Resume.pdf?id=5c39ef59-d541-4dc9-9574-72efec2af323&table=block&spaceId=41ad14f8-d2a5-4b1a-b182-c66a02e1ef17&expirationTimestamp=1706659200000&signature=i4IHBsy5A22nqPnl7darDCwrPZMbNPFTLXdHMKCmYuE&downloadName=Aryan+Gupta+Resume.pdf';

  const viewResume = () => {
    window.open(resumeViewUrl, '_blank');
  };

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={viewResume}
      role="button"
      tabIndex={0}
      onKeyPress={viewResume}
    >
      {hasMounted ? 'Resume' : 'Loading...'}
    </div>
  );
};

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Breadcrumbs block={block} rootOnly={true} />

        <div className='notion-nav-header-rhs breadcrumbs'>
          {navigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}
          <ResumeButton />  
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  )
}
