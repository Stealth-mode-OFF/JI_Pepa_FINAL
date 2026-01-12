import { supabase } from './supabaseClient';
import { projectId } from './info';
import { toast } from 'sonner';

export const submitLead = async (email: string): Promise<void> => {
	try {
		const { data, error } = await supabase
			.from('leads')
			.insert([{ email, projectId }]);

		if (error) throw error;
		toast.success('Lead submitted successfully!');
	} catch (error: any) {
		toast.error('Error submitting lead: ' + (error?.message || 'Unknown error'));
	}
};