export type Config = {
  id?: number
  code?: string
  website_id?: number
  locale?: string
  base_currency_code?: string
  default_display_currency_code?: string
  timezone?: string
  weight_unit?: string
  base_url?: string
  base_link_url?: string
  base_static_url?: string
  base_media_url?: string
  secure_base_url?: string
  secure_base_link_url?: string
  secure_base_static_url?: string
  secure_base_media_url?: string

  default_title?: string
  welcome?: string
}

export type PageData = {
  url_key?: string
  title: string
  content: string
  content_heading?: string
  page_layout?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
}
