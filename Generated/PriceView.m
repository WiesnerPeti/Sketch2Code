#import "PriceView.h"
@implementation PriceView
- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if(self)
    {
	_arrow = [UIView new];
	_titleLabel = [UILabel new];
	_titleLabel.textColor = nil;


	_priceLabel = [UILabel new];
	_priceLabel.textColor = nil;


	_priceBarImageView = [UIView new];
	_backgroundView = [UIView new];


	[self addSubview:_arrow];
	[self addSubview:_titleLabel];
	[self addSubview:_priceLabel];
	[self addSubview:_priceBarImageView];
	[self addSubview:_backgroundView];

    }
    return self;
}
- (void)layoutSubviews
{
    [super layoutSubviews];

	[_arrow setFrame:CGRectMake(299,22,5,10)];
	[_titleLabel setFrame:CGRectMake(9,18,43,17)];
	[_priceLabel setFrame:CGRectMake(244,19,28,17)];
	[_priceBarImageView setFrame:CGRectMake(60,23,173,9)];
	[_backgroundView setFrame:CGRectMake(0,1,320,50)];

}
@end
