import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ainckthvriahwdeczfew.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpbmNrdGh2cmlhaHdkZWN6ZmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4ODQ0NjUsImV4cCI6MjA1NTQ2MDQ2NX0.eqWSaU1BRXNKNYksDKBXfLsLG5GBXX0QMVj1-whwkm8";
export const supabase = createClient(supabaseUrl, supabaseKey);
