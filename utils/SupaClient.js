import { createClient } from "@supabase/supabase-js"

const supabase_url = "https://nwcvdofqkmdjmfouzhvq.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53Y3Zkb2Zxa21kam1mb3V6aHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNDk3NzUsImV4cCI6MjAzMDcyNTc3NX0.sBUthrnbzfYn6iDJ_vZJBvMFmntsJuqPIt5n3aFmLBc"

export const supabase = createClient (supabase_url, supabase_key)