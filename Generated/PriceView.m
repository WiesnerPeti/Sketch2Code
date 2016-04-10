#import "PriceView.h"
@implementation PriceView
- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if(self)
    {
      //Subview initialization comes here
    }
    return self;
}
- (void)layoutSubviews
{
    [super layoutSubviews];

	[_arrow setFrame:CGRectZero]
	[_titleLabel setFrame:CGRectZero]
	[_priceLabel setFrame:CGRectZero]
	[_priceBarImageView setFrame:CGRectZero]
	[_backgroundView setFrame:CGRectZero]

}
@end
