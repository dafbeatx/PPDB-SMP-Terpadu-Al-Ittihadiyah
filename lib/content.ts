import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { PageContent } from '@/types/content.types'

export async function getContent(category?: string): Promise<PageContent[]> {
    const supabase = await createClient()

    let query = supabase
        .from('page_contents')
        .select('*')
        .order('display_order', { ascending: true })

    if (category) {
        query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching content:', error)
        return []
    }

    return data || []
}

export async function getContentByKey(section: string, key: string): Promise<string> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('page_contents')
        .select('value')
        .eq('section', section)
        .eq('key', key)
        .single()

    if (error || !data) {
        return ''
    }

    return data.value
}

export async function getContentMap(category: string): Promise<Record<string, string>> {
    const contents = await getContent(category)
    const map: Record<string, string> = {}

    contents.forEach((content) => {
        // Use section.key format if section exists, otherwise just key
        const mapKey = content.section ? `${content.section}.${content.key}` : content.key
        map[mapKey] = content.value
    })

    return map
}

async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch { }
                },
            },
        }
    )
}
