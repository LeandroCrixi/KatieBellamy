import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js'
import { formattedTitle, formatingPathName } from './utils.js'

const SUPABASE_URL = 'https://jkugrjfgpohuupvnvakm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprdWdyamZncG9odXVwdm52YWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTM4MTEsImV4cCI6MjA1NjE2OTgxMX0.IpbK-ZBAVn3mjxtKubsekxYKppHG3rGg27Nk1u4aEk8'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const fetchResourceMedia = async () => {
    try {
        const { data, error } = await supabase
            .from('resource_media')
            .select('resources_topic(id, title), media_type(id, media, media_icon, alt), resourceTopicId, resource, url, mediaTypeId')
            .eq('resources_topic.title', `${formattedTitle()}`)
            .not('resources_topic', 'is', null)

        if (error) {
            console.error('Error details:', error)
            throw error;
        }
        // console.log(data)
        return data
    } catch (error) {
        console.error('Error fetching data:', error.message)
    }
}

const fetchResourcesTopic = async () => {
    try {
        const { data, error } = await supabase
            .from('resources_topic')
            .select('*')

        if (error) {
            console.error('Error details:', error)
            throw error
        }
        // console.log(data);
        return data
    } catch (error) {
        console.error('Error fetching data:', error.message)
    }
}

const fetchBgImg = async () => {
    try {
        const { data, error } = await supabase
            .from('resources_topic')
            .select('*')
            .eq('title', `${formatingPathName()}`)

        if (error) {
            console.error('Error details:', error)
            throw error
        }
        // console.log(data);
        return data
    } catch (error) {
        console.error('Error fetching data:', error.message)
    }
}

export { fetchResourceMedia, fetchResourcesTopic, fetchBgImg }