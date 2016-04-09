#import "<CLASS_NAME>.h"
@implementation <CLASS_NAME>
- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if(self)
    {
      <SUBVIEW_INIT>
    }
    return self;
}
