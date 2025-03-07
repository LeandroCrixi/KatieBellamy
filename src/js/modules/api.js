import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js'

const SUPABASE_URL = 'https://jkugrjfgpohuupvnvakm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprdWdyamZncG9odXVwdm52YWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1OTM4MTEsImV4cCI6MjA1NjE2OTgxMX0.IpbK-ZBAVn3mjxtKubsekxYKppHG3rGg27Nk1u4aEk8'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const fetchResourceMedia = async () => {
    try {
        const { data, error } = await supabase
            .from('resource_media')
            .select();

        if (error) {
            console.error('Error details:', error);
            throw error;
        }
        // console.log(data);

        //=== Calling more than one table at once ===
        // const { data: resourceMediaData, error: resourceMediaError } = await supabase
        //     .from('resource_media')
        //     .select();

        // const { data: resourcesTopicData, error: resourcesTopicError } = await supabase
        //     .from('resources_topic')
        //     .select();

        // if (resourceMediaError || resourcesTopicError) {
        //     console.error('Error details:', resourceMediaError || resourcesTopicError);
        //     throw resourceMediaError || resourcesTopicError;
        // }

        // console.log(resourceMediaData);
        // console.log(resourcesTopicData);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

const fetchResourcesTopic = async () => {
    try {
        const { data, error } = await supabase
            .from('resources_topic')
            .select('*');

        if (error) {
            console.error('Error details:', error);
            throw error;
        }
        // console.log(data);
        return data
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

export { fetchResourceMedia, fetchResourcesTopic }