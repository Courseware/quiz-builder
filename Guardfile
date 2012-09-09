# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'casper' do
  watch(%r{scenario/scenario\.(js\.coffee|js|coffee)$}) { "scenario" }
  watch(%r{scenario/.+_scenario\.(js\.coffee|js|coffee)$})
  watch(%r{src/(.+?)\.(js\.coffee|js|coffee)$})  { |m|
    "scenario/#{m[1]}_scenario.#{m[2]}"
  }
end
